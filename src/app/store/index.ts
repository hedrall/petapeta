import { RootState } from '~/types';
import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Web3Provider } from '~/web3Provider';
import { Eth } from '~/types/types';

export const state = (): RootState => ({
  isWeb3: false,
  account: '',
  networkId: 0,
});

export const getters: GetterTree<RootState, RootState> = {
  getIsWeb3( state: RootState ) {
    return state.isWeb3;
  },
  getAccount( state: RootState ) {
    return state.account;
  },
  getNetWorkName( state: RootState ) {
    return Eth.networkId[ state.networkId ];
  }
};

export const mutations: MutationTree<RootState> = {
  setWeb3Info( state: RootState, { isWeb3, account, networkId } ) {
    state.isWeb3 = isWeb3;
    state.account = account;
    state.networkId = networkId;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async setWeb3Info( { commit } ) {
    if ( Web3Provider.ethereum ) {
      let accounts;
      try {
        accounts = await Web3Provider.ethereum.enable();
      } catch ( e ) {
        console.error('ログインをキャンセルしました。');
        console.error(e);
        return;
      }
      console.log( accounts );
      commit( 'setWeb3Info', {
        isWeb3: true,
        account: accounts[ 0 ],
        networkId: await Web3Provider.web3.eth.net.getId()
      } );

    }
  }
};
