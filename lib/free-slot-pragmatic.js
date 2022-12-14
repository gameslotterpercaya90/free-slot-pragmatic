'use babel';

import FreeSlotPragmaticView from './free-slot-pragmatic-view';
import { CompositeDisposable } from 'atom';

export default {

  freeSlotPragmaticView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.freeSlotPragmaticView = new FreeSlotPragmaticView(state.freeSlotPragmaticViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.freeSlotPragmaticView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'free-slot-pragmatic:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.freeSlotPragmaticView.destroy();
  },

  serialize() {
    return {
      freeSlotPragmaticViewState: this.freeSlotPragmaticView.serialize()
    };
  },

  toggle() {
    console.log('FreeSlotPragmatic was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
