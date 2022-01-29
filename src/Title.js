const Title = ({text, size}) => {
   
const style = {fontFamily: "Montserrat",
color: '#FFFFFF',
textShadow: '3px 3px red'
}

return (

    <span style={style}>{text}</span>       
               
  );
};

export default Title;


