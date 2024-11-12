import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { NoteApp } from "../target/types/note_app";
import {assert} from "chai";

describe("note-app", () => {
  // Configure the client to use the local cluster.

  const   provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.NoteApp as Program<NoteApp>;

  let note = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    await program.rpc.createNote("Content of new Note", {
      accounts : {
        note : note.publicKey,
        user: provider.wallet.publicKey,
        systemProgram : anchor.web3.SystemProgram.programId,
      },
      signers: [note], 
    });
    let newNote = await program.account.note.fetch(note.publicKey); 

    assert.strictEqual(newNote.content, "Content of new Note");
    assert.strictEqual(newNote.user.toBase58(), provider.wallet.publicKey.toBase58());
  });
  it("can delete a note ", async()=>  {
    await program.rpc.deleteNode({
      accounts: {
        note : note.publicKey,
        user:   provider.wallet.publicKey,
      }
    });
    let deletedNote = await program.account.note.fetchNullable(note.publicKey);

    assert.ok(deletedNote == null);
  })
});





/////////cevvriekvriinuvueoutvtggggeg
