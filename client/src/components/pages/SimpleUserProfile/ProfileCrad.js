import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Box, Stack } from '@mui/system';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfileCrad() {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar   sx={{ width: 150, height: 150,
           
          }}
          src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          onClick={(e) => setOpen(true)} >
           
          </Avatar>
        }
      />
      
      <CardContent>
        <Stack spacing={2}>
        <Typography 
        sx= {{
            display:"flex",
            justifyContent:"center",
            gap:1
        }

        }
        gutterBottom variant='h5'component='div'>
            John Doo
        </Typography>
        <Box sx= {{
            display:"flex",
            justifyContent:"left",
            alignItems:"center",
            gap:1
        }

        }>
        <EmailOutlinedIcon />
        <Typography variant='body2' color='text.secondary'
        >
John.Doo@gmail.com

        </Typography>
        </Box>
        <Box sx= {{
            display:"flex",
            justifyContent:"left",
            alignItems:"center",
            gap:1
        }

        }>
        <MilitaryTechOutlinedIcon/>
        <Typography variant='body2' color='text.secondary'>
Rank
        </Typography>
        
        </Box>
        <Box  sx= {{
            display:"flex",
            justifyContent:"left",
            alignItems:"center",
            gap:1
        }

        }

        >
           < CardGiftcardOutlinedIcon/>
        <Typography variant='body2' color='text.secondary'>
Gifts      </Typography>
</Box>
<Box
sx= {{
    display:"flex",
    justifyContent:"left",
    alignItems:"center",
    gap:1
}

}

>
    <PostAddOutlinedIcon/>
<Typography variant='body2' color='text.secondary'>
Posts
        </Typography>
        </Box>
        
        <Button variant="contained" style={{ background: '#008B8B' }}>
  Edit
</Button>
</Stack>

      </CardContent>

    </Card>
  );
}