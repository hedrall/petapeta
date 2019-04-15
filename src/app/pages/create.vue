<template>
  <div row wrap>

    <v-card>
      <v-card-text>
        <form>
          <p class="primary--text subheading">
            ステップ1. 投稿の情報を記載
          </p>

          <v-text-field
                  :value="getAccount"
                  label="あなたのパブリックアドレス"
                  placehosder="あなたのパブリックアドレス"
                  outline
                  readonly
                  required
          ></v-text-field>

          <v-text-field
                  v-model="url"
                  :counter="100"
                  label="拡散してほしいURL"
                  placehosder="拡散してほしいURL"
                  outline
                  required
                  @input="$v.url.$touch()"
                  @blur="$v.url.$touch()"
                  :error-messages="urlErrors"
          ></v-text-field>

          <v-textarea
                  v-model="message"
                  name="拡散協力者へのメッセージ"
                  outline
                  label="拡散協力者へのメッセージ"
                  :counter="1000"
                  auto-grow
                  value=""
                  @input="$v.message.$touch()"
                  @blur="$v.message.$touch()"
                  :error-messages="messageErrors"
          ></v-textarea>

          <v-text-field
                  v-model="deposit"
                  prepend-icon="fab fa-ethereum"
                  label="拡散者へのお礼 ( ETH )"
                  placehosder="拡散してほしいURL"
                  outline
                  required
                  type="number"
                  @input="$v.deposit.$touch()"
                  @blur="$v.deposit.$touch()"
                  :error-messages="depositErrors"
          ></v-text-field>

          <v-btn color="primary" @click="setDeposit">Check</v-btn>
        </form>
      </v-card-text>
    </v-card>

    <v-dialog
            v-model="dialog"
    >
      <v-card>
        <v-card-title class="headline primary white--text">
          デポジットを登録します。
        </v-card-title>

        <v-card-text>
          <p class="warning--text subheading">
            > {{ deposit }}ETHを拡散協力者へのお礼としてデポジットします。
          </p>
          <p class="warning--text subheading">
            > デポジットの登録にかかるGasはあなたの負担となります。
          </p>
          <p class="warning--text subheading">
            > この操作は取り消せません。
          </p>
        </v-card-text>

        <v-card-actions>
          <v-layout style="display: flex;" justify-center>
            <v-btn
                    color="warning"
                    @click="createPost"
                    :loading="loading"
            >
              上記に同意して、投稿を作成する
            </v-btn>
          </v-layout>
        </v-card-actions>
        <v-card-text>
          <p class="warning--text subheading" v-if="loading">
            > 処理にはしばらく時間がかかります。
          </p>
        </v-card-text>

      </v-card>
    </v-dialog>

    <v-snackbar
            v-model="snackbarTxStart"
            :right="'right'"
            :top="'top'"
            :vertical="'vertical'"
            color="success"
            @click="snackbarTxStart = false"
    >
      登録開始
      <v-btn
              color="white-text"
              flat
              @click="snackbarTxStart = false"
      >
        閉じる
      </v-btn>
    </v-snackbar>

    <v-snackbar
            v-model="snackbarTxComplete"
            :right="'right'"
            :top="'top'"
            :vertical="'vertical'"
            color="success"
            @click="snackbarTxComplete = false"
    >
      登録完了
      <v-btn
              color="white-text"
              flat
              @click="snackbarTxComplete = false"
      >
        閉じる
      </v-btn>
    </v-snackbar>

  </div>
</template>

<script lang="ts">
  import { Component } from 'nuxt-property-decorator';
  import { MyVue } from '~/types/types';
  import { Getter } from 'vuex-class';
  import { required, url, maxLength, between } from 'vuelidate/lib/validators';
  import { Web3Provider } from '~/web3Provider';

  @(Component as any)( {
    validations: {
      url:     { required, url, maxLength: maxLength( 100 ) },
      message: { required, maxLength: maxLength( 1000 ) },
      deposit: { required, between: between( 20, 30 )( 10 ) }
    },
    components:  {}
  } )
  export default class extends MyVue {
    @Getter( 'getAccount' ) getAccount;

    // 拡散してほしいURL
    url: string = 'https://test.com';

    // 拡散協力者へのメッセージ
    message: string = '拡散にご協力お願いいたします。  ';

    // 拡散者へのお礼
    deposit: number = 0.1;

    dialog: boolean = false;

    loading: boolean = false;

    snackbarTxStart: boolean = false;

    snackbarTxComplete: boolean = false;

    get urlErrors() {
      const errors = [];
      if ( !this.$v.url.$dirty ) return [];
      !this.$v.url.required && errors.push( '拡散してほしいURLは必須です。' );
      !this.$v.url.url && errors.push( 'URLの形式が正しくありません。' );
      !this.$v.url.maxLength && errors.push( '100文字以内で入力してください。' );
      return errors;
    };

    get messageErrors() {
      const errors = [];
      if ( !this.$v.message.$dirty ) return [];
      !this.$v.message.required && errors.push( '拡散協力者へのメッセージは必須です。' );
      !this.$v.message.maxLength && errors.push( '1000文字以内で入力してください。' );
      return errors;
    };

    get depositErrors() {
      const errors = [];
      if ( !this.$v.deposit.$dirty ) return [];
      !this.$v.deposit.required && errors.push( '拡散協力者へのお礼金額の入力は必須です。' );
      !this.$v.deposit.between && errors.push( '設定可能な金額は0〜10ETHです。' );
      return errors;
    };

    getValidUrl() {
      return false;
    }

    // デポジット登録処理
    setDeposit() {
      this.$v.$touch();
      if ( this.$v.$invalid ) {
        return;
      }
      this.dialog = true;
    }

    // デポジットを実行し、投稿を作成する
    async createPost() {
      this.loading = true;

      const to_address = '0x4dC08065A1949df271E9211Fc974360C64262AfA';

      // 送付する Ether の量を wei に変換します。
      const weiValue = Web3Provider.web3.utils.toWei( this.deposit.toString(), 'ether' );
      console.log( 'wei' + weiValue );

      // トランザクションオブジェクトを作成します。
      const txObject = {
        from:  this.getAccount, // Ether の送付元アドレス
        to:    to_address,        // Ether の送付先アドレス
        value: weiValue       // 送付する Ether の量（単位は wei）
      };

      console.log( txObject );
      // トランザクションを実行します。
      Web3Provider.web3.eth.sendTransaction( txObject )
      .on( 'transactionHash', ( hash ) => {
        console.log( 'transaction hash: ', hash );
        this.snackbarTxStart = true;
      } )
      .on( 'receipt', ( receipt ) => {
        console.log( 'receipt: ', receipt );
      } )
      .on( 'confirmation', ( confirmationNumber, receipt ) => {
        console.log( 'confirmationNumber: ', confirmationNumber );
        this.snackbarTxComplete = true;
        this.dialog = false;
      } )
      .on( 'error', console.error );
    }
  }
</script>

<style scoped lang="scss">

</style>
