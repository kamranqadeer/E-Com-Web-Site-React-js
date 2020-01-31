import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "auto",
    height: 400,
  },
}));

const ShirtsData = [
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/kashmiri.jpg?alt=media",
    title: "Kashmiri",
    author: "Kashmiri",
    sellHight:"160"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/cotton.jpg?alt=media",
    title: "Corton",
    author: "Corton",
    sellHight:"220"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sharwan%20Style.jpg?alt=media",
    title: "Shafoon",
    author: "Shafoon",
    sellHight:"100"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sialk.jpg?alt=media",
    title: "Sialk",
    author: "Sialk",
    sellHight:"160"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/khari.jpg?alt=media",
    title: "Khari",
    author: "Khari",
    sellHight:"120"

  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/khari.jpg?alt=media",
    title: "Khari",
    author: "Khari",
    sellHight:"150"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/khari.jpg?alt=media",
    title: "Khari",
    author: "Khari",
    sellHight:"130"

  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/khari.jpg?alt=media",
    title: "Khari",
    author: "Khari",
    sellHight:"160"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/khari.jpg?alt=media",
    title: "Khari",
    author: "Khari",
    sellHight:"200"
  },
];
export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {ShirtsData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
