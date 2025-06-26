import { useNavigate } from 'react-router-dom';

function BackButton(props) {
  const navigate = useNavigate();

  const buttonBackStyle = {
    borderRadius: '110px',
    backgroundColor: '#ffb54c',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bolder',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const handleClick = props.handler || (() => navigate(-1));

  return (
    <div>
      <button style={buttonBackStyle} onClick={handleClick}>
        <img
          src='/assets/images/arrowleft.png'
          alt='Back'
          style={{ width: '10px', paddingRight: '5px' }}
        />
        Back
      </button>
    </div>
  );
}

export default BackButton;
