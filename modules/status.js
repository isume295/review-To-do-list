// change completion status
export default function status(task) {
  // eslint-disable-next-line no-unused-expressions
  !task.completed ? task.completed = true : task.completed = false;
}