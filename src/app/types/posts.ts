import { Collaborator } from '~/types/collaborator';

// 拡散依頼の投稿
export class Posts {
  // 拡散してほしいURL
  url: string;

  // 協力者へのメッセージ
  message: string;

  // デポジット ( ETH )
  deposit: number;

  // 締め切り
  deadline: string;

  // 拡散協力者
  collaborators: Collaborator[]
}
