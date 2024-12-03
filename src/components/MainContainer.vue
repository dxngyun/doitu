<template> 
  <div class="body">
    <div class="container">
      <Header
        :workingCount="workingCount"
        :doneCount="doneCount"
        @navigateToCalendar="goToCalendar"
        @filterStatus="filteredTasks"
      />
      <div class="content">
        <Sidebar :tagColors="tagColors" :days="days" @addTask="handleAddTask" />
        <div class="task-columns" >
          <TaskColumn
            :tasks="this.allTasks"
            :col="'left'"
            @markAsDone="markAsDone"
            @deleteTodo="deleteTodo"
            @deleteRoutine="deleteRoutine"
          />
        </div>
        <div class="task-columns" >
          <TaskColumn
            :tasks="this.allTasks"
            :col="'right'"
            @markAsDone="markAsDone"
            @deleteTodo="deleteTodo"
            @deleteRoutine="deleteRoutine"
          />
        </div>     
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./TaskSideBar.vue";
import TaskColumn from "./TaskColumn.vue";
import axios from "axios";
axios.defaults.withCredentials = true; // 쿠키를 전송하기 위해 설정

export default {
  components: {
    Header,
    Sidebar,
    TaskColumn,
  },
  data() {
    return {
      allTasks: [],
      addTasks: [],
      allTaskCount: [], 
      col: {
      type: String,
      required: true,
      },
      tagColors: ["#80D8FF", "#FFD740", "#FFAB91", "#CE93D8", "#A5D6A7"],
      days: ["일", "월", "화", "수", "목", "금", "토"],
      filterStatus: "all",
    };
  },
  computed: {
   workingCount() {
      return this.allTaskCount.routineDto.length + this.allTaskCount.todoDto.filter((task) => !task.done).length;
    },
    doneCount() {
      return this.allTaskCount.todoDto.filter((task) => task.done).length;
    },        
  },

  created() {// 처음 실행 될 때 실행됌 
    axios
      .get("/doitu/api/todoList/ALL")
      .then((response) => {
        if (response.data.statusCode === 200) {     
          this.allTasks = response.data || []; //투두리스트 루틴 리스트 가져옴 
          this.allTaskCount = response.data || []; // working 갯수 (진행중인 계획 ) , done (끝난 계획 갯수 ) 
          this.addIsRoutineToRoutineDto(); //요일 설정 되어 있으면 루틴으로 설정하는 것 
        } else {
          alert("데이터 불러오기 실패");
        }
      })
      .catch((error) => {
        alert("데이터 불러오기 실패: " + error.message);
      });
  },

  methods: {
    dataUP(){ // 데이터 가져오는 메서드인데 , 수정된 데이터들을 바로 반영하기 위한 메서드 
    let API;
      switch (this.filterStatus) { // working , done , all 상태에 따라 가져오는 다른 API로 설정 
      case "done": 
      API = "/doitu/api/todoList/DONE";
      break;
  
      case "working":
      API = "/doitu/api/todoList/WORKING";
      break; 

      default:
      API = "/doitu/api/todoList/ALL";
      break;
      }

      axios
        .get(API)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.allTasks = response.data || []; 
            this.addIsRoutineToRoutineDto();
            this.TaskCount(); //데이터 업로드 할때 마다 working done 갯수세기 위해 존재 
          } else {
            alert("데이터 불러오기 실패");
          }
        })
        .catch((error) => {
          alert("데이터 불러오기 실패: " + error.message);
        });  
      },


    async handleAddTask(newTask) { // sidebar에서 계획 추가하는 로직 
      const routineData = {
        sun: newTask.routine.includes("일"),
        mon: newTask.routine.includes("월"),
        tue: newTask.routine.includes("화"),
        wed: newTask.routine.includes("수"),
        thr: newTask.routine.includes("목"),
        fri: newTask.routine.includes("금"),
        sat: newTask.routine.includes("토"),
      };

      // 순서를 보장한 객체 생성
      const payload = {
        title: newTask.title, // 순서 1
        content: newTask.content, // 순서 2
        sun: routineData.sun, // 순서 3
        mon: routineData.mon, // 순서 4
        tue: routineData.tue, // 순서 5
        wed: routineData.wed, // 순서 6
        thr: routineData.thr, // 순서 7
        fri: routineData.fri, // 순서 8
        sat: routineData.sat, // 순서 9
        color: newTask.tag || "BLUE", // 순서 10
      };

      console.log("Payload being sent:", payload);

      try {
        const response = await axios.post(
          "/doitu/api/todoList/create",
          payload
        );
        console.log("Task created:", response.data);
        this.addTasks.push({ ...response.data, done: false });
        this.dataUP();
      } catch (error) {
        console.error("Error creating task:", error.response || error.message);
        alert("Task 생성 중 오류가 발생했습니다. " + error.message);
      }
    },
     
    addIsRoutineToRoutineDto() { // 요일 존재하면 루틴으로 설정 
      if (this.allTasks.routineDto && Array.isArray(this.allTasks.routineDto)) {
        this.allTasks.routineDto = this.allTasks.routineDto.map((task) => {
          // 요일이 true인 경우 해당 요일 이름을 day 배열에 추가
          const day = [];
          if (task.sun) day.push("일");
          if (task.mon) day.push("월");
          if (task.tue) day.push("화");
          if (task.wed) day.push("수");
          if (task.thr) day.push("목");
          if (task.fri) day.push("금");
          if (task.sat) day.push("토");

        // day 배열에 값이 있으면 isRoutine: true, 없으면 false
          return {
            ...task,
            day, // 요일 배열 추가
            isRoutine: day.length > 0,
          };
        });

        console.log("Updated routineDto with day and isRoutine:", this.allTasks.routineDto);
      } else {
        console.error("routineDto is not an array or is undefined");
      }
    },

  // Todo 삭제 메서드

    async deleteTodo(taskId) {
      try {
          const response = await axios.delete(`/doitu/api/todoList/todo/delete/${taskId}`);
          if (response.status === 200) {
              this.dataUP();
          }
      } catch (error) {
          console.error("삭제 요청 중 오류 발생:", error.message);
      }
    },

  // Routine 삭제 메서드
    async deleteRoutine(routineId) {
      try {
        const response = await axios.delete(`/doitu/api/todoList/routine/delete/${routineId}`);
        if (response.data.statusCode === 200) {
              this.dataUP();
              console.log("삭제 성공");
        } else {
          console.error("Routine 삭제 실패: ", response.data);
        }
      } catch (error) {
        console.error("삭제 요청 중 오류 발생: ", error.message);
      }
    },

    async markAsDone(taskId) {
    // 로컬 상태 업데이트
      const taskIndex = this.allTasks.todoDto.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.allTasks.todoDto[taskIndex].done = !this.allTasks.todoDto[taskIndex].done;
      }
      try {
      const response = await axios.post(`/doitu/api/todoList/done/${taskId}`);
      if (response.data.statusCode === 200) {
        this.dataUP();
      } else {
        alert("상태 변경 실패: " + response.data.msg);
      }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error.message);
      }
    },
  
    filteredTasks(filterInput) { //현재 working done all 버튼 누를때 현재 상태 변함
      switch (filterInput) {
        case "done":                //done이면 끝난 계획만 보여주게 함 
          this.filterStatus = "done";
          this.dataUP();
        break;
        case "working":             // 진행 중인 계획 만 보여줌 
          this.filterStatus = "working";
          this.dataUP();
        break;
        case "all":                 // 계획 모두 보여줌 
        default:
          this.filterStatus = "all";
          this.dataUP();
        break;
      }
    },

    TaskCount() {                       //working done 계획 각각 몇개인지 세는 메서드 
      axios
        .get('/doitu/api/todoList/ALL')
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.allTaskCount = response.data || [];    
          } else {
            alert("데이터 불러오기 실패");
          }
        })
        .catch((error) => {
          alert("데이터 불러오기 실패: " + error.message);
        });  
      },
},
  goToCalendar() {
      this.$router.push("/calendar");
  },

  mounted() {
  },


};
</script>

<style scoped>
.body {
  width: 100vw; /*넓이 보는 화면에 맞춰서 조절*/
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #2dc987; /* 녹색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 수평 스크롤 방지 */
}
.container {
  flex-direction: column;
  font-family: Arial, sans-serif;
  background-color: #e9f7ef;
  width: 80%;
  padding: 20px;
  margin: 20px;
  border-radius: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex: 1;
  gap: 20px;
  height: 100%;
}
.task-columns {
  flex: 1;
  display: flex;
}
</style>