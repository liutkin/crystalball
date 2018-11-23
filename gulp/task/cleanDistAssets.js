import del from 'del';

const cleanDistAssets = () => del(['dist/script/*.js', 'dist/style/*.css']);

export default cleanDistAssets;
