define(['jquery', './app.js?v=1.0.0'], function ($, App) {
  var CustomWidget = function () {
    var self = this;

    this.callbacks = {
      render: function () {
        self.render_template({
          body: `<link type="text/css" rel="stylesheet" href="${self.params.path}/style.css?v=${self.get_settings().version}">`,
          caption: {
            class_name: 'widget-teratrade-statistics-right-panel',
          },
          render: `<div id="widget-teratrade-statistics-integration-right-panel"></div>`,
        });

        const container = document.body;
        App.init(container, APP);

        return true;
      },
      init: function () {
        return true;
      },

      bind_actions: function () {
        return true;
      },

      settings: function () {
        return true;
      },

      onSave: function () {
        return true;
      },

      destroy: function () {},
    };

    return this;
  };
  return CustomWidget;
});
