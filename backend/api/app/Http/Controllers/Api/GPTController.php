<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use App\Models\Nota;

class GPTController extends Controller
{
    function genCuestionario ($id) {

        $nota = Nota::where('id', $id)->get();

        $texto = $nota[0]['contenido_nota'];

        $result = OpenAI::completions()->create([
            'model' => 'text-davinci-003',
            'max_tokens' => 2000,
            'prompt' => '
                Genera una pregunta usando un texto como contexto para la pregunta, genera tambien las opciones
                para responder la pregunta, dame de 3 a 4 opciones y dividelas entre 1 correcta y el resto incorrectas,
                devuelveme todo dentro de un objeto JSON usando las claves pregunta, resCorrecta y resIncorrecta, para las respuestas
                incorrectas metelas dentro de un array, limitate a crear solo el JSON y llenarlo con la información. Texto:
            '.$texto
        ]);

        return $result['choices'][0]['text'];
    }
}
