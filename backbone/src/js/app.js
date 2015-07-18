var $ = require('jQuery'),
  _ = require('underscore'),
  Backbone = require('backbone');


var Task = Backbone.Model.extend({
  defaults: {
    title: 'do something',
    completed: false
  }
});

var Tasks = Backbone.Collection.extend({
  model: Task
});

var TaskView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#js-task-template').html()),
  render: function () {
    var template = this.template(this.model.toJSON());

    this.$el.html(template);

    return this;
  }
});

var TasksView = Backbone.View.extend({
  tagName: 'ul',
  render: function () {
    this.collection.each(function (task) {
      var taskView = new TaskView({model: task});

      this.$el.append(taskView.render().el);
    }, this);

    return this;
  }
});

var tasks = new Tasks([
  {
    title: 'task 1',
    completed: true
  },
  {
    title: 'task 2'
  },
  {
    title: 'task 3'
  }
]);

var tasksView = new TasksView({
  collection: tasks
});

$('#tasks').html(tasksView.render().el);
