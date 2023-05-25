import { api } from '../App';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActionIcon, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';


const TodosColumnListItemDelete = ({ todo }) => {
    const queryClient = useQueryClient();

    const deleteTodoMutation = useMutation(async (id) => {
        await api.delete(`todos/${id}`);
        return id;
    }, {
        onSuccess: (id) => {
            queryClient.invalidateQueries("todos");
            notifications.show({
                title: 'Success!',
                message: `Todo with ID ${id} has been deleted.`,
                color: 'red',
                autoClose: 5000,
                onClose: () => console.log('Notification closed'),
            });
        }
    })

    const handleDeleteTodo = () => {
        deleteTodoMutation.mutate(todo.id);
    }

    return (
        <Tooltip label="Delete">
        <ActionIcon>
            <IconX
                size={30}
                strokeWidth={2}
                color={'red'}
                onClick={handleDeleteTodo}
            />
        </ActionIcon>
        </Tooltip>
    )
}

export default TodosColumnListItemDelete