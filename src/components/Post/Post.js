import Card from '../dumb/Card';

import styles from './Post.module.css';

const Post = (props) => {
  const {
    name,
    summary,
    ratings_average: ratingsAverage,
    created_at: createdAt,
  } = props.post;

  const imageSrc = 'https://i.pinimg.com/originals/ac/6e/f1/ac6ef19d2e419a403d0cfbe9b0f94d4c.jpg';

  return (
    <Card>
      <div className={ styles['post-content'] }>
        <p className={styles['post-name']}>{ name }</p>
        <img
          alt={name}
          src={imageSrc}
          className={styles['post-image']}
        />
        <p>{ summary }</p>
        <p>{ ratingsAverage }</p>
      </div>
    </Card>
  );
}

export default Post;
