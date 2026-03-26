import './../static/style.scss';

export default {
  init(container, widgetInstance) {
    console.log(widgetInstance);

    const button = document.createElement('button');
    button.id = 'technical-support-deltasales-message-button';
    button.className = 'technical-support-deltasales-message-button';
    button.title = 'Техподдержка от DeltaSales';

    container.appendChild(button);

    button.addEventListener('click', async e => {
      e.preventDefault();
      console.log('click');
      //const amouser_id = widgetInstance.widgets?.system?.amouser_id || 28953067;
      const email = widgetInstance.widgets?.system?.amouser || 'KANemtsev@1cbit.ru';
      const subdomain = widgetInstance.widgets?.system?.subdomain || 'techdeltasales';

      await fetch('https://mazdata.ru/technical-support-integration/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain: subdomain,
          email: email,
          message: 'Привет',
        }),
      });
    });

    // Возвращаем метод для очистки
    return {
      destroy: () => {
        button.remove();
        console.log('Floating button removed');
      },
    };
  },
};
