import { Avatar, Badge, Tooltip } from '@mui/material';

export default function ContractAvatar({ contract }) {
  const { name, url, count } = contract;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <Tooltip title={name}>
        <Badge badgeContent={count} color="primary">
          <Avatar src={name + '.png'} sx={{ width: 24, height: 24 }} />
        </Badge>
      </Tooltip>
    </a>
  );
}
