import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeFavorites} from '../../reducers/favorites/favorites';
import {Link} from 'react-router-dom';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handelBookmarksClick = this._handelBookmarksClick.bind(this);
  }

  render() {
    const {place} = this.props;

    return <article className="cities__place-card place-card">
      {place.isPremium && (<div className="place-card__mark">
        <span>Premium</span>
      </div>)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#" onClick={this._handleClick}>
          <img className="place-card__image" src={place.previewImage}
            width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${place.isFavorite &&
          `place-card__bookmark-button--active`}`} type="button"
          onClick={this._handelBookmarksClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(place.rating) * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>{place.title}</Link>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>;
  }

  _handleClick(evt) {
    evt.preventDefault();
    const {place, onActivate} = this.props;
    if (onActivate) {
      onActivate(place);
    }
  }

  _handelBookmarksClick() {
    const {place, onBookmarkClick} = this.props;
    onBookmarkClick(place);
  }
}

PlaceCard.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  onActivate: PropTypes.func,
  onBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
});

const mapDispatchToProps = (dispatch) => ({
  onBookmarkClick: (place) => dispatch(changeFavorites(place))
});

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
