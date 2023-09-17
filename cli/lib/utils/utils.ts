const isDebug = (): boolean => {
  return process.argv.includes('--debug') || process.argv.includes('-d');
};

export { isDebug };
