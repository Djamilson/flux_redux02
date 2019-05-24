import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Creators as FavoriteActions } from "../../store/ducks/favorites";

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string
        })
      ),
      error: PropTypes.oneOfType([null, PropTypes.string])
    }).isRequired
  };

  state = {
    repositoryInput: ""
  };

  handleAddRepository = event => {
    const { addFavoriteRequest } = this.props;
    const { repositoryInput } = this.state;
    event.preventDefault();
    addFavoriteRequest(repositoryInput);
    this.setState({ repositoryInput: "" });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          <input
            placeholder="usuário/repositoório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Adicionar</button>
          {this.props.favorites.loading && <span>Carregando ...</span>}
          {!!this.props.favorites.error && (
            <span style={{ color: "#F00" }}>{this.props.favorites.error}</span>
          )}
        </form>
        <ul>
          {this.props.favorites.data.map(favorite => (
            <li key={favorite.id.toString()}>
              <p>
                <strong>{favorite.name}</strong>({favorite.description})
              </p>
              <a href="{faverote.url}">Acessar</a>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  favorites: state.favorites
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
