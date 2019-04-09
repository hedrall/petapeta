import { RootState } from '~/types';
import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Web3Provider } from '~/web3Provider';

export const state = (): RootState => ({
  isWeb3: false,
  account: ''
});

export const getters: GetterTree<RootState, RootState> = {
  getIsWeb3( state: RootState ) {
    return state.isWeb3;
  },
  getAccount( state: RootState ) {
    return state.account;
  }
};

export const mutations: MutationTree<RootState> = {
  setWeb3Info( state: RootState, { isWeb3, account } ) {
    state.isWeb3 = isWeb3;
    state.account = account;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async setWeb3Info( { commit } ) {
    if ( Web3Provider.web3 ) {
      const accounts = await Web3Provider.web3.eth.getAccounts();
      commit( 'setWeb3Info', {
        isWeb3: true,
        account: accounts[ 0 ]
      } );

    }
  }
};
