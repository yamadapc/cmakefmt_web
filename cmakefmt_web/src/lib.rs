use cmakefmt::parser::cmake_parser;
use cmakefmt::parser::types::CMakeDocument;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ParsedDoc {
    doc: CMakeDocument,
    unparsed_input: String,
}

#[wasm_bindgen]
pub fn parse_doc(input: &str) -> Result<ParsedDoc, JsError> {
    let (input, doc) = cmake_parser(input)?;
    Ok(ParsedDoc { doc, unparsed_input: input.to_string() })
}

#[wasm_bindgen]
pub fn is_completely_parsed(doc: &ParsedDoc) -> bool {
    doc.unparsed_input.is_empty()
}

#[wasm_bindgen]
pub fn format_doc(doc: &ParsedDoc) -> Result<String, JsError> {
    let rc_doc = doc.doc.print();
    let mut output = Vec::new();
    rc_doc.render(80, &mut output)?;
    Ok(std::str::from_utf8(&output)?.to_string())
}
