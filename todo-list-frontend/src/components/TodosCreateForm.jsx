import { TextInput, createStyles, Card, Button, Grid, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';
import { api } from '../App';

const useStyles = createStyles((theme) => ({
  card: {
    width: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

const TodosCreateForm = ({ opened, onClose }) => {
  const { classes } = useStyles()
  const queryClient = useQueryClient()
  const createTodoMutation = useMutation({
    mutationFn: async (data) => {
      const adjustedDate = new Date(data.date)
      adjustedDate.setDate(adjustedDate.getDate() + 1)

      return api.post("todos", {
        data: {
          ...data,
          status: "todo",
          date: adjustedDate.toISOString()
        }
      }).then((response) => response.data.data)
    }
  })

  const form = useForm({
    initialValues: {
      title: '',
      description: "",
      date: ""
    }
  });

  const onSubmit = (values) => {
    createTodoMutation.mutate(values, {
      onSuccess: () => {
        form.reset()
        queryClient.invalidateQueries(["todos"])
        notifications.show({
          title: 'Success',
          message: 'New todo has been added.',
          color: 'green',
          autoClose: 5000,
          onClose: () => console.log('Notification closed'),
        });
      }
    })
  }

  return (
    <Modal opened={opened} onClose={onClose} size="lg" >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Card shadow="sm" px={70} pt={80} radius="md" pos="static">
          <Grid grow>
            <Grid.Col span={12}>
              <TextInput
                placeholder="Title"
                {...form.getInputProps('title')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                placeholder="Description"
                {...form.getInputProps('description')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <DateInput
                pt={120}
                valueFormat="DD MMM"
                placeholder="Final date"
                maw="30%"
                mx="auto"
                radius="xl"
                {...form.getInputProps('date')}
              />
            </Grid.Col>
          </Grid>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md" type="submit" mb={20} onClick={onClose}>
            Create
          </Button>

        </Card>
      </form>
    </Modal>
  )
}

export default TodosCreateForm