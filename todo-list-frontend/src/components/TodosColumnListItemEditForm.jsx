import { api } from '../App';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { Button, Modal, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';

const TodosColumnListItemEditForm = ({ opened, onClose, todo }) => {
    const queryClient = useQueryClient();

    const form = useForm({
        initialValues: {
            title: todo.attributes.title,
            description: todo.attributes.description,
            date: new Date(todo.attributes.date)
        }
    });

    const editTodoMutation = useMutation(async ({ id, title, description, date }) => {
        return api.put(`todos/${id}`, {
            data: {
                description: description,
                title: title,
                date: date
            }
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            onClose()
            notifications.show({
                title: 'Success!',
                message: `Todo with ID ${todo.id} has been edited.`,
                color: 'green',
                autoClose: 5000,
                onClose: () => console.log('Notification closed'),
            });
        }
    })

    const onSubmit = (data) => {
        editTodoMutation.mutate({ id: todo.id, title: data.title, description: data.description, date: data.date });
    }

    return (
        <Modal opened={opened} onClose={onClose} title="EDIT TODO">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <TextInput label="Title" {...form.getInputProps('title')} my={25} />
                <TextInput label="Description" {...form.getInputProps('description')} />
                <DateInput
                    pt={110}
                    valueFormat="DD MMM"
                    maw="30%"
                    mx="auto"
                    radius="xl"
                    label="Final date"
                    style={{ textAlign: 'center' }}
                    {...form.getInputProps('date')} />
                <Button variant="light" color="blue" fullWidth radius="md" type="submit" mt={20}>Save</Button>
            </form>
        </Modal>
    )
}

export default TodosColumnListItemEditForm