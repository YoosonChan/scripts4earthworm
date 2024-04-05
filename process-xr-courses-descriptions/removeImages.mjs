/**
 * removeAllImages Macro
 */
function removeAllImages() {
  Selection.Find.Wrap = wdFindContinue;
  Selection.Find.Wrap = wdFindContinue;
  (obj => {
    obj.Text = "^g";
    obj.Forward = true;
    obj.Wrap = wdFindContinue;
    obj.MatchCase = false;
    obj.MatchByte = true;
    obj.MatchWildcards = false;
    obj.MatchWholeWord = false;
    obj.MatchFuzzy = false;
    obj.Replacement.Text = "";
  })(Selection.Find);
  (obj => {
    obj.Style = "";
    obj.Highlight = wdUndefined;
    (obj => {
      obj.Style = "";
      obj.Highlight = wdUndefined;
    })(obj.Replacement);
  })(Selection.Find);
  Selection.Find.Execute(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, wdReplaceAll, undefined, undefined, undefined, undefined);
  ActiveDocument.Save();
}
