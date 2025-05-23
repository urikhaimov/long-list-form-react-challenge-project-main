
import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Box } from '@mui/material';
import UserRow from '../pages/users/userRow/UserRow';

const ROW_HEIGHT = 400;

const VirtualList = ({
  users,
  onFieldChange,
  onDelete,
  errorsMap
}) => {
  const Row = useCallback(({ index, style }) => {
    const user = users[index];
    return (
      <div style={{ ...style, width: '100%' }} key={user.id}>
        <UserRow
          user={user}
          onChange={onFieldChange}
          onDelete={onDelete}
          errors={errorsMap[user.id] || {}}
        />
      </div>
    );
  }, [users, onFieldChange, onDelete, errorsMap]);

  return (
    <Box height={600} width="100%">
      <List
        height={600}
        width="100%"
        itemCount={users.length}
        itemSize={ROW_HEIGHT}
        itemKey={(index) => users[index].id}
      >
        {Row}
      </List>
    </Box>
  );
};

export default VirtualList;
