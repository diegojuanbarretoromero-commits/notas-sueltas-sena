<?php
/**
 * Plantilla para entradas individuales - Notas Sueltas.
 *
 * @package TuTema
 */

get_header();
?>

<main id="primary" class="site-main note-single-container">

    <div class="note-wrapper">
        
        <!-- Botón de regreso al inicio o listado -->
        <div class="note-navigation-back">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="back-link">&larr; Volver a las notas</a>
        </div>

        <?php
        while ( have_posts() ) :
            the_post();
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class( 'note-article' ); ?>>
                
                <!-- Cabecera simple y directa -->
                <header class="note-header">
                    <span class="note-date"><?php echo get_the_date( 'j \d\e F, Y' ); ?></span>
                    <?php the_title( '<h1 class="note-title">', '</h1>' ); ?>
                </header>

                <!-- Imagen destacada opcional (si alguna nota lleva foto) -->
                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="note-thumbnail">
                        <?php the_post_thumbnail( 'large' ); ?>
                    </div>
                <?php endif; ?>

                <!-- Cuerpo de la nota -->
                <div class="note-content">
                    <?php
                    the_content();

                    wp_link_pages(
                        array(
                            'before' => '<div class="page-links">' . esc_html__( 'Páginas:', 'tu-tema' ),
                            'after'  => '</div>',
                        )
                    );
                    ?>
                </div>

                <!-- Pie de nota minimalista (Etiquetas opcionales) -->
                <footer class="note-footer">
                    <?php 
                    $tags = get_the_tag_list( '', ' ' );
                    if ( $tags ) {
                        echo '<div class="note-tags"><span class="tags-label">#</span> ' . $tags . '</div>';
                    }
                    ?>
                </footer>

            </article><!-- #post-<?php the_ID(); ?> -->

            <!-- Navegación fluida entre notas anteriores y siguientes -->
            <nav class="note-pagination">
                <?php
                previous_post_link( '<div class="nav-prev">%link</div>', '<span class="nav-arrow">&larr;</span> %title' );
                next_post_link( '<div class="nav-next">%link</div>', '%title <span class="nav-arrow">&rarr;</span>' );
                ?>
            </nav>

            <?php
            // Comentarios opcionales (puedes omitirlo si prefieres un blog de notas cerrado)
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;

        endwhile;
        ?>

    </div><!-- .note-wrapper -->

</main><!-- #primary -->

<?php
get_footer();