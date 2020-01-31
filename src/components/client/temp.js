import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

const tileData = [
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/kashmiri.jpg?alt=media",
    title: "Kashmiri",
    author: "Kashmiri"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/cotton.jpg?alt=media",
    title: "Corton",
    author: "Corton"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Shafoon.webp?alt=media",
    title: "Shafoon",
    author: "Shafoon"
  },
  {
    img:
      "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sialk.jpg?alt=media",
    title: "Sialk",
    author: "Sialk"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/khari.jpg?alt=media",
    title: 'Khari',
    author: 'Khari',
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/kurta.jpg?alt=media",
    title: 'Kurta style',
    author: 'Kurta style',
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/apnadarzi007.appspot.com/o/Sharwan%20Style.jpg?alt=media",
    title: 'Shrwani style',
    author: 'Shrwani style',
  },
];
export default function SingleLineGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
