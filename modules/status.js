export default function status(task) {
  if (!task.completed) {
    task.completed = true;
  } else if (task.completed) {
    task.completed = false;
  }
}