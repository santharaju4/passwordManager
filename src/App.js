import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from './component/PasswordItem'

import './App.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    searchInput: '',
    passwordList: [],
    website: '',
    username: '',
    password: '',
    isActive: false,
  }

  deleteItem = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordList: filteredPasswordList})
  }

  renderAuthButton = () => {
    const {passwordList, searchInput, isActive} = this.state
    const searchResults = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(searchResults)
    if (passwordList.length === 0) {
      return (
        <div className="no-passwords-container">
          <img
            className="no-passwords-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p className="no-passwords-text">No Passwords</p>
        </div>
      )
    }
    if (searchResults.length === 0) {
      return (
        <div className="no-passwords-container">
          <img
            className="no-passwords-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p className="no-passwords-text">No Passwords</p>
        </div>
      )
    }

    return (
      <ul className="list-item-container">
        {searchResults.map(eachItem => (
          <PasswordItem
            key={eachItem.id}
            itemDetails={eachItem}
            isActive={isActive}
            deleteItem={this.deleteItem}
          />
        ))}
      </ul>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
    const backgroundColor = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )

    console.log(backgroundColor)

    const initialBackgroundColorClassName = `initial-container ${initialContainerBackgroundClassNames[backgroundColor]}`

    const {website, username, password} = this.state
    const newContactList = {
      id: v4(),
      website,
      username,
      password,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newContactList],
      website: '',
      username: '',
      password: '',
    }))
  }

  onToggleActive = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {searchInput, website, username, password, passwordList} = this.state

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="card-container">
          <div className="top-card-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-small-logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-large"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <h1 className="password-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icons"
                />
                <input
                  onChange={this.onChangeWebsite}
                  placeholder="Enter Website"
                  className="input-element"
                  value={website}
                  type="text"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icons"
                />
                <input
                  onChange={this.onChangeInput}
                  placeholder="Enter Username"
                  className="input-element"
                  value={username}
                  type="text"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icons"
                />
                <input
                  onChange={this.onChangePassword}
                  placeholder="Enter Password"
                  className="input-element"
                  type="password"
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="bottom-card-container">
            <div className="bottom-navbar">
              <div className="password-count-container">
                <h1 className="bottom-password-heading">Your Passwords</h1>
                <p className="password-count">{passwordList.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icons"
                />
                <input
                  onChange={this.onChangeSearchInput}
                  placeholder="Search"
                  className="input-element"
                  type="text"
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="show-password-container">
              <input
                onClick={this.onToggleActive}
                className="check-box"
                id="showPasswords"
                type="checkbox"
              />
              <label className="label" htmlFor="showPasswords">
                Show Passwords
              </label>
            </div>
            <div>{this.renderAuthButton()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
