export class Collaborator {
  // 拡散先の URL
  diffusion_url: string;

  // 拡散者のパブリックアドレス
  public_address: string;

  constructor( collaborator: Partial<Collaborator> ) {
    Object.assign( this, collaborator );
  }

}
