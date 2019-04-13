<template>
  <div>
    <v-btn color="info" @click="dialog = true">協力する</v-btn>

    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>拡散に協力する</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <form>

            <v-text-field
                v-model="post.url"
                label="あなたのEthアドレス"
                placehosder="あなたのEthアドレス"
                outline
                readonly
                required
            ></v-text-field>

            <v-text-field
                v-model="$store.state.account"
                :counter="42"
                label="あなたのEthアドレス"
                placehosder="あなたのEthアドレス"
                outline
                readonly
                required
            ></v-text-field>

            <v-text-field
                    value="John Doe"
                    label="Outline"
                    outline
                    readonly
            ></v-text-field>


            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>

          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Notifications</v-list-tile-title>
                <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="sound"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Sound</v-list-tile-title>
                <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="widgets"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from "nuxt-property-decorator";
  import { email, required } from "vuelidate/lib/validators";
  import { MyVue } from '~/types/types';
  import { Getter } from 'vuex-class';

  @(Component as any)( {
    validations: {
      account:     { required },
      email:    { required, email },
      select:   { required },
      checkbox: {
        checked( val ) {
          return val;
        }
      }
    },
    data() {
      return {
        // form variables

        dialog:        false,
        dialog2:       false,
        dialog3:       false,
        notifications: false,
        sound:         true,
        widgets:       false,
        items:         [
          {
            title: "Click Me"
          },
          {
            title: "Click Me"
          },
          {
            title: "Click Me"
          },
          {
            title: "Click Me 2"
          }
        ],
        select:        [
          { text: "State 1" },
          { text: "State 2" },
          { text: "State 3" },
          { text: "State 4" },
          { text: "State 5" },
          { text: "State 6" },
          { text: "State 7" }
        ]
      };
    }

  } )
  export default class Spread extends MyVue {
    @Getter( 'getAccount' ) getAccount;

    @Prop() post!: string;

    get accountErrors() {
      const errors = [];
      console.log('name');
      console.log(this.$v.name);
      !(this as any).$v.account.required && errors.push( "Name is required." );
      return errors;
    };

    checkboxErrors() {
      const errors = [];
      if ( !(this as any).$v.checkbox.$dirty ) return errors;
      !(this as any).$v.checkbox.checked && errors.push( "You must agree to continue!" );
      console.log(errors);
      return errors;
    };

    emailErrors() {
      const errors = [''];
      if ( !(this as any).$v.email.$dirty ) return errors;
      !(this as any).$v.email.email && errors.push( "Must be valid e-mail" );
      !(this as any).$v.email.required && errors.push( "E-mail is required" );

      console.log('error');
      console.log(errors);
      return errors;
    };

    submit() {
      ( this as any).$v.$touch();
    };
    clear() {
      ( this as any).$v.$reset();
      ( this as any).name     = "";
      ( this as any).email    = "";
      ( this as any).select   = null;
      ( this as any).checkbox = false;
    }

  }
</script>

<style lang="scss" scoped>

</style>
