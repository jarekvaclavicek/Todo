import { useState } from 'react';
import { Text, Group, ActionIcon, Flex, createStyles, Tooltip, Card } from '@mantine/core';
import TodosColumnListItemEditForm from './TodosColumnListItemEditForm';
import TodosColumnListItemChangeStatus from './TodosColumnListItemChangeStatus';
import TodosColumnListItemDelete from './TodosColumnListItemDelete';
import { DateInput } from '@mantine/dates';
import { IconEdit } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../App';

const useStyles = createStyles((theme) => ({
    text: {
        width: "77%"
    }
}))

const TodosColumnListItem = ({ todo }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const { classes } = useStyles()

    const queryClient = useQueryClient()
    const updateTodoMutation = useMutation({
        mutationFn: (updatedTodo) => {
            return api.put(`todos/${updatedTodo.id}`, { data: updatedTodo })
                .then((response) => response.data.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
        }
    })

    const handleDateChange = (value) => {
        const updatedTodo = {
            ...todo,
            attributes: {
                ...todo.attributes,
                date: value.toISOString(),
            }
        }

        updateTodoMutation.mutate(updatedTodo)
    }


    return (
        <Card padding="lg" radius="lg" withBorder pos="static" >
            <Group position="apart" mt="xd" mb="xs">
                <Text className={classes.text}>
                    {todo.attributes.title}
                    <Text size="sm" color="dimmed" mt={5} >
                        {todo.attributes.description}
                    </Text>
                </Text>

                <Flex gap={8}>
                    <Tooltip label="Edit">
                        <ActionIcon>
                            <IconEdit
                                size={30}
                                strokeWidth={2}
                                color={'orange'}
                                onClick={() => setShowEditModal(true)}
                            />
                        </ActionIcon>
                    </Tooltip>
                    <TodosColumnListItemDelete todo={todo} />
                </Flex>
            </Group>
            <Flex justify="center" gap="xl">
                <TodosColumnListItemChangeStatus todo={todo} />
                <DateInput
                    valueFormat="DD MMM"
                    placeholder="Final date"
                    readOnly={true}
                    maw="30%"
                    mx="auto"
                    radius="xl"
                    value={new Date(todo.attributes.date)}
                    onChange={handleDateChange}
                />
            </Flex>
            <TodosColumnListItemEditForm opened={showEditModal} onClose={() => setShowEditModal(false)} todo={todo} />
        </Card>
    )
}

export default TodosColumnListItem
