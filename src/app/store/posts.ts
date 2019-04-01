import { PostsState, RootState } from '~/types';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Post } from '~/types/post';

export const state = (): PostsState => ({
  posts:    [] = [],
  page:     0,
  per_page: 9
});

export const getters: GetterTree<PostsState, RootState> = {
  getPosts( state: PostsState ): Post[] {
    return state.posts;
  }
};

export const mutations: MutationTree<PostsState> = {
  setPosts( state: PostsState, posts: Post[] ): void {
    state.posts = [];
    posts.forEach( post => {
      state.posts.push( post );
    } );
  }
};

export const actions: ActionTree<PostsState, RootState> = {
  async fetchPosts( { commit, state } ) {
    const result = await this.$axios.$get( '/api/posts.json' );

    commit(
      'setPosts',
      result.slice( 0, state.per_page ).map( _ => new Post( _ ) )
    );
  }
};
