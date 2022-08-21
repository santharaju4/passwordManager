import './index.css'

const PasswordItem = props => {
  const {itemDetails, isActive, deleteItem} = props
  const {website, username, password, id, initialBackGround} = itemDetails

  const initial = website ? website[0].toUpperCase() : ''

  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li className="list-item">
      <div className={initialBackGround}>
        <p className="initial">{initial}</p>
      </div>
      <div className="details-con">
        <p className="name">{website}</p>
        <p className="name">{username}</p>
        {isActive ? (
          <p className="name">{password}</p>
        ) : (
          <img
            className="stars"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          />
        )}
      </div>

      <button
        onClick={onDelete}
        className="button"
        type="button"
        testid="delete"
      >
        <img
          className="delete-icon"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default PasswordItem
