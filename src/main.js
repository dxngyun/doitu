import { createApp } from 'vue';
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css'; // 스타일 임포트
import router from './router'; // 라우터 추가

const app = createApp(App);

// VCalendar 사용 설정
app.use(VCalendar, { componentPrefix: 'vc' });

// Vue Router 사용 설정
app.use(router);

app.mount('#app');
