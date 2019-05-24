import { call, put, select } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as favoriteActions } from "../ducks/favorites";

export function* addFavorite(action) {
  // const response = yield api.get(`/repos/${action.payload.repository}`);
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`);
    const isDuplicated = yield select(state =>
      state.favorites.data.find(favorite => favorite.id === data.id)
    );

    if (isDuplicated) {
      yield put(favoriteActions.addFavoriteFailure("Repositório duplicado!"));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url
      };
      yield put(favoriteActions.addFavoriteSuccess(repositoryData));
    }
  } catch (err) {
    yield put(
      favoriteActions.addFavoriteFailure("Erro ao adicionar repositório")
    );
  }
}
