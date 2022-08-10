import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { postCardProps } from '../types.d';

const PostCard = ({ title, date, id }: postCardProps) => {
  return (
    <Card sx={{ width: 300, bgcolor: '#e5e5e5' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/posts/${id}`}>
          See solution
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
