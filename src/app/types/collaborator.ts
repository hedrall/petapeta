import { SNS } from '~/types/types';

export class Collaborator {
  // パブリックアドレス
  public_address: string;

  // 拡散先のURL
  diffusion_url: string;

  // 拡散先SNS名
  sns: SNS;

  // SNSのアカウント名
  account_name: string;

  // 拡散した投稿の内容
  content: string;

  // リツイート数
  retweets: number = 0;

  // ファボ数
  favorites: number = 0;

  // 獲得額
  reword: number = 0;

  // 作成時刻
  created_at: string;

  constructor( collaborator: Partial<Collaborator> ) {
    Object.assign( this, collaborator );
  }

}
