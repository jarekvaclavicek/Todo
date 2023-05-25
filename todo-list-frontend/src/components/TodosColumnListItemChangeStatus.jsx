import { api } from '../App';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';

const TodosColumnListItemChangeStatus = ({ todo }) => {
    const queryClient = useQueryClient();

    const updateTodoMutation = useMutation(async ({ id, status }) => {
        return api.put(`todos/${id}`, {
            data: {
                status: status
            }
        });
    }, {
        onSuccess: (id) => {
            queryClient.invalidateQueries("todos");
            notifications.show({
                title: 'Success!',
                message: `Todo with ID ${todo.id} has been edited.`,
                color: 'blue',
                autoClose: 5000,
                onClose: () => console.log('Notification closed'),
            });
        }
    })

    const setStatus = (status) => {
        updateTodoMutation.mutate({ id: todo.id, status: status })
    }

    return (
        <Select
            radius="lg"
            value={todo.attributes.status}
            data={[
                { value: 'todo', label: 'Todo' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'done', label: 'Done' }
            ]}
            onChange={setStatus}
        />
    )
}

export default TodosColumnListItemChangeStatus