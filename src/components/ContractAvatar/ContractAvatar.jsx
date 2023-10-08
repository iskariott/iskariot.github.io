import { Avatar, Badge, Tooltip } from '@mui/material';

export default function ContractAvatar({ contract }) {
  const { name, link, count, img } = contract;
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Tooltip title={name}>
        <Badge badgeContent={count} color="primary">
          <Avatar src={img} sx={{ width: 24, height: 24 }} />
        </Badge>
      </Tooltip>
    </a>
  );
}
