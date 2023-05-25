import { useQuery } from '@tanstack/react-query';
import { api } from '../App';
import { Progress, Grid } from '@mantine/core';
import TodosColumn from './TodosColumn';


const Todos = ({search}) => {


  const todos = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return api.get("todos").then((response) => response.data.data)
    }
  })

  const filteredTodos = search.length > 0 ? todos.data?.filter((item) => item.attributes.title.includes(search)) : todos.data

  const todoItems = filteredTodos?.filter((item) => item.attributes.status === "todo")
  const todoInProgressItems = filteredTodos?.filter((item) => item.attributes.status === "in_progress")
  const todoDoneItems = filteredTodos?.filter((item) => item.attributes.status === "done")

  // loading bar
  const allTodoCount = todos.data?.length ?? 0
  const doneTodoCount = todoDoneItems?.length ?? 0
  const donePercentage = doneTodoCount / allTodoCount * 100

  return (
    <div>
      <Progress value={donePercentage} />

 

        <Grid mt={8} mx={16}> 
          <Grid.Col span={12} lg={4}>
          <TodosColumn todos={todoItems} title="TODO" />
          </Grid.Col>
          <Grid.Col span={12} lg={4}>
            <TodosColumn todos={todoInProgressItems} title="IN PROGRESS" />
          </Grid.Col>
          <Grid.Col span={12} lg={4}>
            <TodosColumn todos={todoDoneItems} title="DONE" />
          </Grid.Col>
        </Grid>

    </div>
  )
}

export default Todos