function readbet() {
        const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
        
        if (radioButtons.length === 0) {
            console.log('No radio buttons are checked.');
            return;
        }

        radioButtons.forEach((radio) => {
            const parent = radio.parentElement;
            const grandparent = parent.parentElement;
            const great_grandparent = grandparent.parentElement;
            const very_great_grandparent = great_grandparent.parentElement;
            console.log(great_grandparent.innerHTML)

            const gridContainer = great_grandparent;
            const gridRow = parent.closest('.row-lg-2');
            const gridColumn = parent.closest('.col-sm-2');
            console.log(Array.from(gridContainer).children)
            const colindex = Array.from(gridRow.children).indexOf(gridColumn);
            const rowIndex = Array.from(gridContainer.children).indexOf(gridRow);
            console.log(Array.from(gridContainer.children).indexOf(gridRow))

            console.log(`Checked radio button position: Row ${rowIndex}, Column ${colindex}`);
        });
    }