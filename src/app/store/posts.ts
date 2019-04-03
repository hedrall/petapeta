import { PostsState, RootState } from '~/types';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Post, PostsApiResponse } from '~/types/post';

export const state = (): PostsState => ({
  posts:    [] = [],
  page:     1,
  per_page: 9,
  total: 0,
  loading: false
});

export const getters: GetterTree<PostsState, RootState> = {
  getPosts( state: PostsState ): Post[] {
    return state.posts;
  },
  getCurrentPage( state: PostsState ): number {
    return state.page;
  },
  getTotalPages( state: PostsState ): number[] {
    if (!state.total) {
      return [1];
    }
    return Array(
      Math.floor(state.total / state.per_page) + ( !(state.total % state.per_page) ? 0 : 1 )
    ).fill(1).map( (_, index) => index + 1 );
  },
  getLoading( state: PostsState ): boolean {
    return state.loading;
  }
};

export const mutations: MutationTree<PostsState> = {
  setPosts( state: PostsState, posts: Post[] ): void {
    state.posts = [];
    posts.forEach( post => {
      state.posts.push( post );
    } );
  },
  updatePaginateState( state: PostsState, { page, total } ) {
    state.page = page;
    state.total = total;
  },
  toggleLoading( state: PostsState ) {
    state.loading = !state.loading;
  }
};

export const actions: ActionTree<PostsState, RootState> = {
  async fetchPosts( { commit }, { next_page } ) {
    commit( 'toggleLoading' );
    commit( 'setPosts', [] );

    await new Promise( resolve => setTimeout(resolve, 300));

    // TODO: ページごとに取得する
    const result: PostsApiResponse = await this.$axios.$get( '/api/posts.json' );

    commit( 'setPosts', result.posts.map( _ => new Post( _ ) ) );
    commit( 'updatePaginateState', {
      page: next_page,
      total: result.total
    });

    commit( 'toggleLoading' );
  }
};
