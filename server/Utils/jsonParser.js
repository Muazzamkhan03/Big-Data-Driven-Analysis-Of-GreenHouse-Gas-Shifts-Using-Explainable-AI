function safeJsonParse(rawString) {
  try {
    return JSON.parse(rawString);
  } catch (err) {
    // Attempt to fix common JSON mistake: missing commas
    const fixed = rawString.replace(/}(\s*")/g, '},$1');
    try {
      return JSON.parse(fixed);
    } catch (e) {
      console.error("❌ Failed to parse even after fixing:", e.message);
      return {};
    }
  }
}

module.exports = safeJsonParse;