 $(document).ready(function() {
            let currentStep = 1;
            const totalSteps = $('.wizard-step').length;

            function updateProgress(step) {
                let percentage = ((step - 1) / (totalSteps)) * 100;
                $('#progressBar').css('width', percentage + '%');
            }

            function goToStep(targetStep) {
                const $current = $('.wizard-step.active');
                const $next = $(`.wizard-step[data-step="${targetStep}"]`);

                // Fade out current step, then fade in the next one for a smooth transition
                $current.removeClass('active');
                setTimeout(() => {
                    $current.hide();
                    $next.show().addClass('active');
                }, 150);

                currentStep = targetStep;
                updateProgress(currentStep);
            }

            updateProgress(0);

            // Next Button Handler with basic validation
            $('.btn-next').on('click', function() {
                let $activeStep = $(`.wizard-step[data-step="${currentStep}"]`);
                let isValid = true;

                // Validate required fields in current step
                $activeStep.find('input[required]').each(function() {
                    if (!$(this).val().trim()) {
                        $(this).addClass('error');
                        isValid = false;
                    } else {
                        $(this).removeClass('error');
                    }
                });

                if (isValid && currentStep < totalSteps) {
                    goToStep(currentStep + 1);
                }
            });

            // Previous Button Handler
            $('.btn-prev').on('click', function() {
                if (currentStep > 1) {
                    goToStep(currentStep - 1);
                }
            });

            // Form Submit Handler
            $('#surveyWizard').on('submit', function(e) {
                e.preventDefault();
                
                // Hide form and show success card smoothly
                $('#surveyWizard').fadeOut(300, function() {
                    $('#successMessage').fadeIn(300);
                    $('#progressBar').css('width', '100%');
                });
            });
        });


$(function () {
      var $btn = $('.menu-toggle');
      var $nav = $('.horizontal');        // or $('#horizontal') — match your choice above

      $btn.on('click', function () {
        var open = $nav.toggleClass('open').hasClass('open');
        $btn.attr('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });

      $nav.on('click', 'a', function () {  // close when a link is tapped
        $nav.removeClass('open');
        $btn.attr('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });