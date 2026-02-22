try {
    require.resolve('framer-motion');
    console.log('framer-motion is installed');
} catch (e) {
    console.error('framer-motion is NOT installed');
    process.exit(1);
}
