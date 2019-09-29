// TODO: figure out custom data attributes
interface HTMLGlobalAttributes {
  accesskey: string;
  autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  className: 'string';
  contenteditable: boolean;
  dir: 'ltr' | 'rtl' | 'auto';
  draggable: boolean;
  dropzone: 'copy' | 'move' | 'link';
  hidden: boolean;
  id: string;
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  is: string;
  itemid: string;
  itemprop: string;
  itemref: string;
  itemtype: string;
  lang: string;
  slot: string;
  spellcheck: boolean;
  style: string;
  tabindex: number;
  title: string;
  translate: '' | 'yes' | 'no';
}

export type GlobalAttributes = Partial<HTMLGlobalAttributes>;