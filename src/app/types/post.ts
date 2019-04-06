import { Collaborator } from '~/types/collaborator';
import { PostState } from '~/types/types';

export class PostsApiResponse {
  posts: Post[];

  total: number;

  page: number;

  per_page: number;
}

export class PostApiResponse {
  post: Post;
}

// 拡散依頼の投稿
export class Post {
  id: number;

  // 拡散してほしいURL
  url: string;

  // 協力者へのメッセージ
  message: string;

  // デポジット ( ETH )
  deposit: number;

  // デポジット登録済み
  is_deposit: boolean;

  // 締め切り
  deadline: string;

  // 状態
  status: PostState;

  // 依頼者のパブリックアドレス ( 返金用 )
  public_address: string;

  // 拡散協力者
  collaborators: Collaborator[] = [];

  // 投稿作成時間
  created_at: string;

  // 最終更新時刻
  updated_at: string;

  constructor( post: Partial<Post> ) {
    Object.assign( this, post );

    if ( post.collaborators ) {
      this.collaborators = post.collaborators.map( _ => new Collaborator( _ ) );
    }

  }
}
