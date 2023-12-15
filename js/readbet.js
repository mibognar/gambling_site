function readbet() {
        const radioButtons = document.querySelectorAll('.betbtn:checked');
        
        if (radioButtons.length === 0) {
            console.log('No radio buttons are checked.');
            return;
        }

        radioButtons.forEach((radio) => {
            const parent = radio.parentElement;
            const grandparent = parent.parentElement;
            const great_grandparent = grandparent.parentElement;
            const very_great_grandparent = great_grandparent.parentElement;
        
            const gridContainer = great_grandparent;
            const gridRow = grandparent;
            const gridColumn = parent
            console.log(gridColumn)
            const colindex = Array.from(gridRow.children).indexOf(gridColumn);
            const rowIndex = Array.from(gridContainer.children).indexOf(gridRow);

            console.log(`Checked radio button position: Row ${rowIndex}, Column ${colindex}`);
        });
    }