import { Collaborator } from '~/types/collaborator';
import { PostState } from '~/types/types';

// 拡散依頼の投稿
export class Post {
  // 拡散してほしいURL
  url: string;

  // 協力者へのメッセージ
  message: string;

  // デポジット ( ETH )
  deposit: number;

  // 締め切り
  deadline: string;

  // 状態
  state: PostState;

  // 依頼者のパブリックアドレス ( 返金用 )
  public_address: string;

  // 拡散協力者
  collaborators: Collaborator[];

  constructor( post: Partial<Post> ) {
    Object.assign( this, post );
  }
}
