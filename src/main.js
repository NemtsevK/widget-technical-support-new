import { createApp } from 'vue';
import App from './App.vue';
import './../static/style.scss';

export default {
  init(container, widgetInstance) {
    const app = createApp(App, {
      widget: widgetInstance,
    });

    app.mount(container);
  },
};
